import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import Title from './Title';
import theme from '../theme';

const List = ({ status }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://vives.pimaxplus.com/issues.php?status=${status}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch issues');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setIssues(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching issues:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [status]);

  const extractId = (id) => id.substr(3);
  const toUpper = (text) => text.substr(0, text.indexOf(' ')).toUpperCase();

  const groupIssuesByPerson = () => {
    const persons = [...new Set(issues.map(issue => issue.assigned))];

    const sections = persons.map(person => ({
      name: person,
      data: issues.filter(issue => issue.assigned === person)
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Title status={status} />
        <ActivityIndicator size="large" color={theme.COLOR_BORDER} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Title status={status} />
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorText}>Please check if the status parameter is correct.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title status={status} />
      <SectionList
        sections={groupIssuesByPerson()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    maxWidth: 600,
    padding: 20,
  },
  list: {
    flex: 1,
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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default List;