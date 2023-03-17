import React, { useState } from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import DtDevices from './device/DataTableDevices'
import { ScrollPanel } from 'primereact/scrollpanel';

export default function MenuTabBar() {

    const items = [
        {label: 'Аппараты'},{label: 'Инструменты'},{label: 'Напитки'},{label: 'Техпроцесс'},{label: 'Меню'},
        {label: 'Конфигурация аппарата'},{label: 'Плейлисты'},{label: 'Техники'},{label: 'Клиенты'},{label: 'Статистика'},
        {label: 'Статусы узлов аппарата'},{label: 'Технические операции'},{label: 'Расширенные настройки'},
        {label: 'Продажа'}
    ];

  return (
    <div>
        <TabView>

            <TabPanel header="Аппараты">
                <ScrollPanel style={{ width: '100%', height: '100%' }}>
                    <DtDevices/>
                </ScrollPanel>
            </TabPanel>

            <TabPanel header="Инструменты">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Напитки">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Техпроцесс">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Меню">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Конфигурация аппарата">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Плейлисты">
                <DtDevices/>
            </TabPanel>

            <TabPanel header ="Техники">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Статусы узлов аппарата">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Клиенты">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Статистика">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Технические операции">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Расширенные настройки">
                <DtDevices/>
            </TabPanel>

            <TabPanel header="Продажа">
                <DtDevices/>
            </TabPanel>
        </TabView>
    </div>
  )
}
