import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    async createDb() {
        let    tasks = [
            {id: 1, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
            {id: 2, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4}
        ];
        await fetch('./assets/data.json', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(function (data) {
            //Load the data as new DataSource
            tasks = data;
        }).catch(function (error) {
            alert(error.message);
        });
        let links = [
            {id: 1, source: 1, target: 2, type: "0"}
        ];
        await fetch('./assets/data.link.json', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(function (data) {
            //Load the data as new DataSource
            console.log(data);
            links = data;
        }).catch(function (error) {
            alert(error.message);
        });
        console.log(tasks);
        return {tasks, links};
    }
}