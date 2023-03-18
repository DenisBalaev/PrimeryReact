import React from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import DtDevices from './device/DataTableDevices'
import { ScrollPanel } from 'primereact/scrollpanel';
import Demo from './ProductsDemo';

export default function MenuTabBar() {

  return (
    <div>
        <TabView>

            <TabPanel header="Аппараты">
                <ScrollPanel style={{ width: '100%', height: '100%' }}>
                    <DtDevices/>
                </ScrollPanel>
            </TabPanel>

            <TabPanel header="Инструменты">
                <Demo/>
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
