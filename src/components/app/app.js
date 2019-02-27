import React, {Component} from 'react';



import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component {

    constructor() {
        super();

        this.maxId = 1;

        this.createTodoItem = (label) => {
            return {
                label,
                important: false,
                done: false,
                id: this.maxId++
            }
        };


        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch')
            ],

            term: ''
        };




        this.onDeleteItem = (id) => {

            this.setState(({todoData}) => {

                const idx = todoData.findIndex((el) =>  el.id === id);
                const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

                return {
                    todoData: newArray
                }
            })

        };

        this.addItem = (text) => {

             const newItem = this.createTodoItem(text);


            this.setState(({todoData}) => {
                const newArray = [ ...todoData, newItem];

                return {
                    todoData: newArray
                }
            });

        };

        this.toggleProperty = (arr, id, propName) => {
            const idx = arr.findIndex((el) =>  el.id === id);
            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};

            return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
        };

        this.onToggleDone = (id) => {
            this.setState(({todoData}) => {

                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            })

        };

        this.onToggleImportant = (id) => {
            this.setState(({todoData}) => {

                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            })
        };

        this.search = (items, term) => {
            if (term.length === 0) return items;

            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
            })
        };

        this.onSearch = (term) => {
            this.setState({term});
        };

    }

    render() {

        const { todoData, term } = this.state;
        const visibleItems = this.search(todoData, term);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.onDeleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}

                />
                <ItemAddForm addItem={this.addItem}/>
            </div>
        )
    }

}

