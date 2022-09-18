import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';
import { GameParams } from '../../@types/navigation';

export function Game() {

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [selectedDuoDiscord, setSelectedDuoDiscord] = useState<string>('')

  function handleGoBack() {
    navigation.goBack()
  }

  async function getUserDiscord(adId:string) {
    const response = await axios.get(`http://192.168.100.157:8080/ads/${adId}/discord`)
    const data = response.data as {discord: string}
    setSelectedDuoDiscord(data.discord)
  }

  useEffect(() => {
    async function handleAds() {
      const response = await axios.get(`http://192.168.100.157:8080/games/${game.id}/ads`)
      const data = response.data as DuoCardProps[]
      setDuos(data)
    }

    handleAds()
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image 
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subtitle='Connect and start playing!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => getUserDiscord(item.id)}/>
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos?.length ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator= {false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              There are no ads published yet.
            </Text>
          )}
        />

        <DuoMatch
          visible={!!selectedDuoDiscord.length}
          discord={selectedDuoDiscord}
          onClose={() => setSelectedDuoDiscord('')}
        />
      </SafeAreaView>
    </Background>
  );
}