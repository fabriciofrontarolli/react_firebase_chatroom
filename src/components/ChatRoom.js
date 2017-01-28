import React, {Component} from 'react';

class ChatRoom extends Component {

    constructor(props, context){
        super(props, context);

        this.handleChatMessage = this.handleChatMessage.bind(this);
        this.handleUpdateMessage = this.handleUpdateMessage.bind(this);

        this.state = {
            message: '',
            messages: []
        };
    }

    handleUpdateMessage(e){
        this.setState({
            message: e.target.value
        });
    }

    handleChatMessage(e){
        const message = this.state.message;
        const newMessage = {
            id: this.state.messages.length,
            message
        }

        /* send to firebase */
        firebase.database()
                .ref(`messages/${newMessage.id}`)
                .set(newMessage);
        // const newMessageList = Object.assign([], this.state.messages);
        // newMessageList.push(newMessage);
        //
        // this.setState({
        //     messages: newMessageList
        // });
    }

    componentDidMount(){
        firebase.database()
                .ref('messages/')
                .on('value', (snapshot) => {

                    const currentMessages = snapshot.val()

                    console.log('currentMessages');
                    console.log(currentMessages);

                    if(currentMessages != null){
                        this.setState({
                            messages: currentMessages
                        })
                    }
                });
    }

    render(){
        const chatMessages = this.state.messages.map((m) => {
                                return <li key={m.id}>{m.message}</li>
                             });

        return(
            <div>
                <div className="chat-output">
                    { chatMessages }
                </div>
                <div className="chat-input">
                    <label>Send your message</label>
                    <input type="text" onChange={this.handleUpdateMessage} />
                    <button onClick={this.handleChatMessage}>
                        <img src="build/telegram.png" />
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatRoom;
