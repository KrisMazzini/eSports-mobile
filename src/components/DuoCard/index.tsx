import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native'

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

export interface DuoCardProps {
    id: string;
    name: string;
    weekDays: string[];
    useVoiceChannel: boolean;
    yearsPlaying: number;
    hourStart: string;
    hourEnd: string;
}

interface Props {
    data: DuoCardProps
}

export function DuoCard({data}:Props) {
    console.log(data)
    return (
    <View style={styles.container}>
        <DuoInfo
            label='Name'
            value={data.name}
        />
        
        <DuoInfo
            label='Years playing'
            value={`${data.yearsPlaying} years`}
        />

        <DuoInfo
            label='Availability'
            value={`${data.weekDays.length} day(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />

        <DuoInfo
            label='Use voice channel?'
            value={data.useVoiceChannel ? "Yes" : "No"}
            valueColor={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

        <TouchableOpacity
            style={styles.button}
        >
            <GameController color={THEME.COLORS.TEXT} size={20}/>
            <Text style={styles.buttonTitle}>Connect</Text>
        </TouchableOpacity>
    </View>
  );
}