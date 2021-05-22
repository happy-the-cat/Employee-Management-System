import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {ListItem} from 'react-native-elements';

import * as Styles from '../Styles';

const Accordion = ({keyId, titleContent, items, topDivider, bottomDivider}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      topDivider={topDivider}
      bottomDivider={bottomDivider}
      key={keyId}
      content={titleContent}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}>
      {items}
    </ListItem.Accordion>
  );
};

export {Accordion};
