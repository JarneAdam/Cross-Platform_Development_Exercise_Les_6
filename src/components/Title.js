import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme';

const Title = ({ status }) => <Text style={styles.container}>{status} issues</Text>;

const styles = StyleSheet.create({
    container: {
        fontSize: theme.FONT_SIZE_TITLE,
        fontWeight: theme.FONT_WEIGHT_BOLD,
        textAlign: 'center',
        paddingBottom: theme.SPACING_MB
    },
});

export default Title;