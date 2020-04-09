import React, { Component } from 'react'

class Creation extends Component {
    state = {
        value: ""
    }
    
    render() {
        return (
            <div className="creation">
                <form>
                    <input id="elemName" type="text" size="60" value={this.state.value}
                        onKeyDown={(event) => this.inputKeyDown(event)} onChange={(event) => this.changeInputValue(event)} />
                    <button id="create" onClick={() => this.clickButtonCreate(this.props)} type="button">Создать</button>
                </form>
            </div>
        )
    }

    inputKeyDown(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            this.clickButtonCreate(this.props);
        }
        return;
    }

    changeInputValue(event) {
        this.setState({ value: event.value });
    }

    clickButtonCreate(props) {
        let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
        let value = document.getElementById('elemName').value;
        let id = 0;
        while (true) {
            if (id in localStorageObj) {
                id++;
                continue;
            } else {
                localStorageObj[id] = {
                    value:  value,
                    done: false,
                }
                break;
            }
        }

        localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
        props.reRenderList();
        this.setState({ value: "" });
    }
}

export default Creation
