import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';

import logoImg from "../../assets/logo-nlw-esports.png"
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
    
    const [games, setGames] = useState<GameCardProps[]>([])

    useEffect(() => {
        async function handleGames() {
            const gamesResponse = await axios.get('http://192.168.1.9:8080/games')
            const data = gamesResponse.data as GameCardProps[]
            setGames(data)
        }

        handleGames()
    }, [])
  
    return (
    <SafeAreaView style={styles.container}>
        <Image 
            source={logoImg}
            style={styles.logo}
        />

        <Heading
            title="Find your duo!"
            subtitle="Choose the game that you wanna play..."
        />

        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <GameCard
                    data={item}
                />
            )}
            contentContainerStyle={styles.contentList}
        />

    </SafeAreaView>
  );
}