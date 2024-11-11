import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { DefrostCalculator } from "./DefrostCalculator";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Defrost Calculator"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#65adf1",
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Defrost Calculator"
                component={DefrostCalculator}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);