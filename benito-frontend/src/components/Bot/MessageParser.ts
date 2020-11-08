class MessageParser {
  actionProvider : any
  state: any
  constructor(actionProvider:any, state:any) {
    this.actionProvider = actionProvider;
    this.state = state
  }

  parse(message:String) {

    if(this.state.canWrite)
    {
      return this.actionProvider.handleProjectParse();
    }
    return this.actionProvider.handleDefault();
  };
}

export default MessageParser;
