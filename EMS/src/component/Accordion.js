import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {ListItem} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import * as Styles from '../Styles';

const Accordion = ({
  titleContent,
  items,
  topDivider,
  bottomDivider,
  icon,
  expandIcon,
  noRotation,
  onPress,
  onLayout,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      topDivider={topDivider}
      bottomDivider={bottomDivider}
      content={titleContent}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
        return onPress;
      }}
      icon={icon}
      expandIcon={expandIcon}
      noRotation={noRotation}
      onLayout={onLayout}>
      {items}
    </ListItem.Accordion>
  );
};

export {Accordion};
