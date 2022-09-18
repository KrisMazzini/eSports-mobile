import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

import logoImg from "../../assets/logo-nlw-esports.png"
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
    
    const [games, setGames] = useState<GameCardProps[]>([])

    const navigation = useNavigation()

    function handleOpenGames({id, title, bannerUrl}:GameCardProps) {
        navigation.navigate('game', {id, title, bannerUrl})
    }

    useEffect(() => {
        async function handleGames() {
            const gamesResponse = await axios.get('http://192.168.100.157:8080/games')
            const data = gamesResponse.data as GameCardProps[]
            setGames(data)
        }

        handleGames()
    }, [])
  
    return (
        <Background>
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
                        <GameCard data={item} onPress={() => handleOpenGames(item)}/>
                    )}
                    contentContainerStyle={styles.contentList}
                />

            </SafeAreaView>
        </Background>
    );
}