import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'

// Add <TourGuideProvider/> at the root of you app!
export function App1() {
    return (
        <TourGuideProvider {...{ borderRadius: 16 }}>
            <AppContent />
        </TourGuideProvider>
    )
}

const AppContent = () => {
    const iconProps = { size: 40, color: '#888' }

    // Use Hooks to control!
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    } = useTourGuideController()

    // Can start at mount 🎉
    // you need to wait until everything is registered 😁
    React.useEffect(() => {
        if (canStart) {
            // 👈 test if you can start otherwise nothing will happen
            start()
        }
    }, [canStart]) // 👈 don't miss it!

    const handleOnStart = () => console.log('start')
    const handleOnStop = () => console.log('stop')
    const handleOnStepChange = () => console.log(`stepChange`)

    React.useEffect(() => {
        eventEmitter.on('start', handleOnStart)
        eventEmitter.on('stop', handleOnStop)
        eventEmitter.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter.off('start', handleOnStart)
            eventEmitter.off('stop', handleOnStop)
            eventEmitter.off('stepChange', handleOnStepChange)
        }
    }, [])

    return (
        <View style={style.container}>
            {/*
  
            Use TourGuideZone only to wrap your component
  
        */}
            <TourGuideZone
                zone={2}
                text={'A react-native-copilot remastered! 🎉'}
                borderRadius={16}
            >
                <Text style={style.title}>
                    {'Welcome to the demo of\n"rn-tourguide"'}
                </Text>
            </TourGuideZone>
            <View style={style.middleView}>
                <TouchableOpacity style={style.button} onPress={() => start()}>
                    <Text style={style.buttonText}>START THE TUTORIAL!</Text>
                </TouchableOpacity>

                <TourGuideZone zone={3} shape={'rectangle_and_keep'}>
                    <TouchableOpacity style={style.button} onPress={() => start(4)}>
                        <Text style={style.buttonText}>Step 4</Text>
                    </TouchableOpacity>
                </TourGuideZone>
                <TouchableOpacity style={style.button} onPress={() => start(2)}>
                    <Text style={style.buttonText}>Step 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={stop}>
                    <Text style={style.buttonText}>Stop</Text>
                </TouchableOpacity>
                <TourGuideZone
                    zone={1}
                    shape='circle'
                    text={'With animated SVG morphing with awesome flubber 🍮💯'}
                >
                    {/* <Image source={{ uri }} style={style.profilePhoto} /> */}
                </TourGuideZone>
            </View>
            {/* <View style={style.row}>
                <TourGuideZone zone={4} shape={'circle'}>
                    <Ionicons name='ios-contact' {...iconProps} />
                </TourGuideZone>
                <Ionicons name='ios-chatbubbles' {...iconProps} />
                <Ionicons name='ios-globe' {...iconProps} />
                <TourGuideZone zone={5}>
                    <Ionicons name='ios-navigate' {...iconProps} />
                </TourGuideZone>
                <TourGuideZone zone={6} shape={'circle'}>
                    <Ionicons name='ios-rainy' {...iconProps} />
                </TourGuideZone>
                <TourGuideZoneByPosition
                    zone={7}
                    shape={'circle'}
                    isTourGuide
                    bottom={30}
                    left={35}
                    width={300}
                    height={300}
                />
            </View> */}
        </View>
    )
}





const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    profilePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginVertical: 20,
    },
    middleView: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activeSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
})
