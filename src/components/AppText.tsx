/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {Text, StyleProp, TextStyle} from 'react-native';

type FontSize = 'large' | 'middle' | 'small';
type FontWeight = 'bold' | 'regular' | 'medium' | 'semiBold' | 'black';

const fs: Record<FontSize, number> = {
  large: 28,
  middle: 17,
  small: 12,
};

const fw: Record<FontWeight, string> = {
  bold: 'Nunito-Bold',
  regular: 'Nunito-Regular',
  medium: 'Nunito-Medium',
  semiBold: 'Nunito-SemiBold',
  black: 'Nunito-Black',
};

interface AppTextProps {
  text: string;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({
  text,
  fontSize,
  fontWeight,
  textColor,
  textStyle,
}) => {
  const fontSizeValue = fontSize ? fs[fontSize] : 17;
  const fontWeightValue = fontWeight ? fw[fontWeight] : 'Nunito-Regular';

  return (
    <Text
      style={[
        {
          fontSize: fontSizeValue,
          fontFamily: fontWeightValue,
          color: textColor || 'white',
        },
        textStyle,
      ]}>
      {text}
    </Text>
  );
};
