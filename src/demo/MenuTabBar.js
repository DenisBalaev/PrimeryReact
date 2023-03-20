import React from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import DeviceMain from './device/DeviceMain';
import IngredientMain from './IngredientMain';

export default function MenuTabBar() {

  return (
    <div>
        <TabView>

            <TabPanel header="Аппараты">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Ингредиенты">
                <IngredientMain/>
            </TabPanel>

            <TabPanel header="Напитки">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Техпроцесс">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Меню">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Конфигурация аппарата">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Плейлисты">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header ="Техники">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Статусы узлов аппарата">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Клиенты">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Статистика">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Технические операции">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Расширенные настройки">
                <DeviceMain/>
            </TabPanel>

            <TabPanel header="Продажа">
                <DeviceMain/>
            </TabPanel>
        </TabView>
    </div>
  )
}
