import React from 'react';
import { View, Image } from 'react-native';

import logoImg from "../../assets/logo-nlw-esports.png"
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
        <Image 
            source={logoImg}
            style={styles.logo}
        />

        <Heading
            title="Find your duo!"
            subtitle="Choose the game that you wanna play..."
        />
    </View>
  );
}