import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = '#4CAF50',
  height = 8,
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
      <Text style={styles.text}>
        {current} / {total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bar: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
});
