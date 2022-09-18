import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';

import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'

import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}:Props) {
    const [isCoppying, setIsCoppying] = useState<boolean>(false)


    async function handleCopyDiscordToClipboard() {
        setIsCoppying(true)
        try {
            await Clipboard.setStringAsync(discord)
            Alert.alert('Copied to clipboard!', 'Use the discord username to connect with your new duo!')
        } catch(err) {
            console.error(err)
            Alert.alert('Failed to copy to clipboard!')
        } finally {
            setIsCoppying(false)
        }
    }

    return (
        <Modal animationType='fade' transparent statusBarTranslucent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>

                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons 
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading 
                        title="Let's play!"
                        subtitle="Now you just have to enjoy!"
                        style={{alignItems: 'center', marginTop: 24}}
                    />

                    <Text style={styles.label}>
                        Add on Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCoppying}
                    >
                        <Text style={styles.discord}>
                            {isCoppying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}