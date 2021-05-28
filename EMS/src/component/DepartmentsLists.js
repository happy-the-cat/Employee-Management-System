import React from 'react';
import {ListItem} from 'react-native-elements';

import {RoundAvatar} from './Avatar';
import {Accordion} from './Accordion';

const MemberListItem = ({
  type,
  name,
  onPress,
  containerStyle,
  hideChevron,
  chevronProps,
  source,
}) => (
  <ListItem onPress={onPress} containerStyle={containerStyle}>
    <RoundAvatar size="small" title={name[0]} source={source} />
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

const DepartmentAccordionItem = ({department, onLayout}) => (
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
            name={department.head.name}
            onPress={null /*TODO: add some action for clicking dept. head*/}
          />
        ) : null}
        {department.members.map(member => (
          <MemberListItem
            key={member.id}
            name={member.name}
            onPress={null /*TODO: add some action for clicking a member*/}
          />
        ))}
      </>
    }
  />
);

export {DepartmentAccordionItem, MemberListItem};
