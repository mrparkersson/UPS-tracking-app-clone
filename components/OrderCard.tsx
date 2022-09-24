import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '../navigator/RootNavigator';
import { TabParam } from '../navigator/TabNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParam, 'Orders'>,
  NativeStackNavigationProp<RootStackParam>
>;

export type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Order', { order })}>
      <Card containerStyle={tw('rounded-lg px-5')}>
        <View style={tw('flex-row justify-between items-center')}>
          <View>
            <Icon
              name="truck-delivery"
              color="#eb6a7c"
              type="material-community"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(order.createdAt).toLocaleString()}
            </Text>
          </View>

          <View>
            <Text style={[tw('text-gray-400'), { fontSize: 10 }]}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tw('text-gray-500 text-xl')}>
              {order.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw('flex-row items-center')}>
            <Text style={[tw('text-sm'), { color: '#eb6a7c' }]}>
              {order.trackingItems.items.length}
            </Text>
            <Icon name="box" type="feather" style={tw('ml-2')} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
