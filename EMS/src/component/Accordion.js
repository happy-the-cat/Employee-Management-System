import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {ListItem} from 'react-native-elements';

import * as Styles from '../Styles';

const Accordion = ({
  titleContent,
  items,
  topDivider,
  bottomDivider,
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
      }}
      onLayout={onLayout}>
      {items}
    </ListItem.Accordion>
  );
};

export {Accordion};
