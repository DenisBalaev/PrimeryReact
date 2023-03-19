export const DeviceService = {
    getDevices() {
        return fetch('data/devices-small.json').then(res => res.json()).then(d => d.data);
    },

    getHistoryData(){
        return [
            {
              "date": "2023-10-09",
              "actionName": "Перезагрузка",
              "author": "Иванов.Д.М"
            },
            {
              "date": "2023-10-10",
              "actionName": "Выключение",
              "author": "Домников.Д.М"
            },
            {
              "date": "2023-10-11",
              "actionName": "Выдача сдачи",
              "author": "Камольский.З.М"
            }
        ]
    },

    getHistory(){
        return Promise.resolve(this.getHistoryData());
    }
};

