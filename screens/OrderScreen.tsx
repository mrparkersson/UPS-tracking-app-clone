import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '../navigator/RootNavigator';
import { TabParam } from '../navigator/TabNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import DeliveryCard from '../components/DeliveryCard';

type OrderScreenProp = RouteProp<RootStackParam, 'Order'>;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParam, 'Orders'>,
  NativeStackNavigationProp<RootStackParam>
>;

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  const {
    params: { order },
  } = useRoute<OrderScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: 'black' },
      headerBackTitle: 'Deliveries',
      headerTintColor: '#eb6a7c',
    });
  }, [order]);
  return (
    <View style={tw('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
