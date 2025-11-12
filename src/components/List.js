import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { issues } from '../../issues';
import Title from './Title';
import theme from '../theme';

const List = ({ status }) => {
  const extractId = (id) => id.substr(3);
  const toUpper = (text) => text.substr(0, text.indexOf(' ')).toUpperCase();

  const groupIssuesByPerson = () => {
    const persons = [...new Set(issues.map(issue => issue.assigned))];

    const sections = persons.map(person => ({
      name: person,
      data: issues.filter(issue =>
        issue.status === status &&
        issue.assigned === person
      )
    }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return sections;
  };

  const renderItem = ({ item }) => (
    <View style={[styles.issueItem, item.assigned && item.assigned.toLowerCase() === 'katerina larson' ? styles.katerina : styles.other]}>
      <Text>
        <Text style={styles.propName}>ID: </Text>
        {extractId(item.id)}
      </Text>
      <Text>
        <Text style={styles.propName}>Omschrijving: </Text>
        {item.description}
      </Text>
      <Text>
        <Text style={styles.propName}>Toegewezen aan: </Text>
        {toUpper(item.assigned)}
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.name}</Text>
  );

  return (
    <View style={styles.container}>
      <Title status={status} />
      <SectionList
        sections={groupIssuesByPerson()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 600,
    padding: 20,
  },
  issueItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.COLOR_BORDER,
    borderStyle: 'solid',
    marginBottom: theme.SPACING_MB,
    paddingVertical: theme.PADDING_VERTICAL,
    paddingHorizontal: theme.PADDING_HORIZONTAL,
  },
  propName: {
    fontWeight: theme.FONT_WEIGHT_SEMI
  },
  katerina: {
    backgroundColor: theme.COLOR_KATERINA_BG
  },
  other: {
    backgroundColor: theme.COLOR_OTHER_BG
  },
  sectionHeader: {
    fontWeight: 'bold'
  }
});

export default List;