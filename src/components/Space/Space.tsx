import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import {getStyles} from './Space.styles';

export interface SpaceProps {
  size: number;
  isHorizontal?: boolean;
}

const Space: FC<SpaceProps> = ({size, isHorizontal}) => {
  const styles = useMemo(() => getStyles({size}), [size]);

  return <View style={isHorizontal ? styles.horizontal : styles.vertical} />;
};

Space.defaultProps = {
  size: 0,
};

export default React.memo(Space);
