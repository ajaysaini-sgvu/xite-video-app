import React from 'react';
import { FlatList, Image, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { IVideo } from './types';

interface Props {
    videos: IVideo[],
}

interface Style {
    videoImage: ImageStyle,
    listItem: ViewStyle,
    itemText: ViewStyle,
    titleText: TextStyle,
    artistText: TextStyle,
    itemDivider: ViewStyle
}

const VideoList = (props: Props) => {

    const renderItem = ({ item }: { item: IVideo }) => {
        const { artist, title, image_url, release_year } = item;

        return (
            <View style={styles.listItem}>
                <Image
                    style={styles.videoImage}
                    source={{
                        uri: image_url,
                    }}
                />
                <View style={styles.itemText}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.artistText}>{artist}</Text>
                    <Text>Release Year - {release_year}</Text>
                </View>
            </View>
        );
    }

    const ItemDivider = () => {
        return (
            <View
                style={styles.itemDivider}
            />
        );
    }

    return (
        <FlatList
            data={props.videos}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemDivider}
        />
    )
}

const styles = StyleSheet.create<Style>({
    videoImage: {
        height: 80,
        width: 120
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    itemText: {
        flexDirection: 'column',
        marginHorizontal: 8
    },
    titleText: {
        fontSize: 14,
        fontWeight: '600'
    },
    artistText: {
        marginTop: 2
    },
    itemDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
        marginVertical: 8
    },

});

export default VideoList;
