import React from 'react';
import { View, PanResponder, Animated, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.65 * SCREEN_WIDTH;
const SwipeOutDuration = 250;

export default class Deck extends React.Component {
    static defaultProps = {
        onSwipeRight: () => { },
        onSWipeLeft: () => { },
    };

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });

                // console.log(gesture);
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            },
        });

        this.state = { panResponder, position, index: 0 };
    }
    resetPosition() {
        Animated.spring(this.state.position,
            { useNativeDriver: false, toValue: { x: 0, y: 0 } }).start();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    UNSAFE_componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            useNativeDriver: false,
            toValue: { x: x, y: 0 },
            duration: SwipeOutDuration,
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSWipeLeft, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSWipeLeft(item),
            this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg'],
        });
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }],
        };
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        return this.props.data
            .map((item, i) => {
                if (i < this.state.index) {
                    return null;
                }

                if (i === this.state.index) {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[this.getCardStyle(), styles.cardStyle]}
                            {...this.state.panResponder.panHandlers}>
                            {this.props.renderCard(item)}
                        </Animated.View>
                    );
                } else {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
                        >
                            {this.props.renderCard(item)}
                        </Animated.View>
                    );
                }
            })
            .reverse();
    }

    render() {
        const data = this.props;
        return <View>{this.renderCards()}</View>;
    }
}
const styles = {
    cardStyle: {
        position: "absolute", width: "100%", zIndex: 1,

    },
};