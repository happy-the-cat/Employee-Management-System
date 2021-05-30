import React from 'react';
import {ListItem} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import {RoundAvatar} from './Avatar';
import {Accordion} from './Accordion';
import * as Styles from '../Styles';

const MemberListItem = ({
  size,
  type,
  name,
  id,
  onPress,
  containerStyle,
  hideChevron,
  chevronProps,
  source,
}) => {
  const lastIndex = name.lastIndexOf(' ') + 1;

  const renderList = () => (
    <ListItem
      onPress={onPress ? () => onPress(id) : null}
      containerStyle={containerStyle}>
      <RoundAvatar
        size={size ? size : 'small'}
        title={name[0] + (lastIndex !== -1 ? name[lastIndex] : '')}
        source={source}
      />
      <ListItem.Content>
        {type === 'head' ? (
          <>
            <ListItem.Title>{name}</ListItem.Title>
            <ListItem.Subtitle>Department Head</ListItem.Subtitle>
          </>
        ) : (
          <ListItem.Title>{name}</ListItem.Title>
        )}
      </ListItem.Content>
      {!hideChevron ? <ListItem.Chevron {...chevronProps} /> : null}
    </ListItem>
  );

  return onPress ? (
    <Ripple onPress={() => onPress(id)}>{renderList()}</Ripple>
  ) : (
    <>{renderList()}</>
  );
};

const DepartmentAccordionItem = ({department, onLayout, onPressItem}) => (
  <Accordion
    topDivider
    onLayout={onLayout}
    titleContent={
      <ListItem.Content>
        <ListItem.Title>{department.name}</ListItem.Title>
      </ListItem.Content>
    }
    items={
      <>
        {department.head.name.length > 0 ? (
          <MemberListItem
            type="head"
            id={department.head.id}
            name={department.head.name}
            onPress={
              onPressItem /*TODO: add some action for clicking dept. head*/
            }
            hideChevron
            containerStyle={{paddingVertical: Styles.whitespaces.inner}}
          />
        ) : null}
        {department.members.map(member => (
          <MemberListItem
            key={member.id}
            id={member.id}
            name={member.name}
            onPress={onPressItem}
            hideChevron
            containerStyle={{paddingVertical: Styles.whitespaces.inner}}
          />
        ))}
      </>
    }
  />
);

export {DepartmentAccordionItem, MemberListItem};
