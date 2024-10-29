/*
 *     FRAMEWORK
 */
import React, {useEffect, useRef, useState} from 'react';
/*
 *     COMPONENTS
 */
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Button} from '../components/Button';
import {AppText} from '../components/AppText';
/*
 *     STATE
 */
import {useReduxSelector, useReduxDispatch} from '../store';
import {selectIsDarkMode, selectFeed} from '../store/selectors';
import {resetFeed, setRefreshing} from '../store/slices/feedSlice';
import {fetchImages} from '../store/operations';
/*
 *     STYLING
 */
import {lightTheme, darkTheme} from '../utils/theme';

const FeedScreen: React.FC = () => {
  const dispatch = useReduxDispatch();
  const darkMode = useReduxSelector(selectIsDarkMode);
  const {images, loading, refreshing, page} = useReduxSelector(selectFeed);
  const scrollPosition = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const currentTheme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchImages());
    }
  }, [dispatch, page]);

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(resetFeed());
    dispatch(fetchImages()).then(() => {
      dispatch(setRefreshing(false));
    });
  };

  const loadMoreImages = () => {
    if (!loading) {
      dispatch(fetchImages());
    }
  };

  const handleScrollToTop = () => {
    console.log('to top');

    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset < scrollPosition.current;

    if (isScrollingUp && currentOffset > 0) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    scrollPosition.current = currentOffset;
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.uri}} style={styles.image} resizeMode="cover" />
      <AppText
        text={item.author}
        fontSize="middle"
        fontWeight="medium"
        textStyle={styles.description}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loading || refreshing) return null;
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color={currentTheme.colors.primary}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.colors.background},
      ]}>
      {showScrollTop && (
        <Button
          type="primary"
          buttonStyle={styles.scrollTopButton}
          onPress={handleScrollToTop}
          iconName="arrow-up"
        />
      )}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString() + Math.random()}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  itemContainer: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  description: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
    color: 'white',
  },
  loadingIndicator: {
    paddingVertical: 20,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    zIndex: 100,
  },
});

export default FeedScreen;
