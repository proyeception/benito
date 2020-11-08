class ActionProvider {
  createChatBotMessage : any
  setState : any
  createClientMessage : any

  constructor(createChatBotMessage:any, setStateFunc:any, createClientMessage:any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage
  }

  handleCategoriesChoice = (userMessage : String) => {
    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage(
      "¿Te interesa alguna de estas categorías? Si tenías otra cosa en mente, escribimelo",
      {
        widget: "categoriesOptions",
        withAvatar: false,
        loading: true,
        terminateLoading: true,
      }
    );
    this.addMessageToState(message);
  };

  
  handleProyectateQuestion = async (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Proyectate es la plataforma central en la que podrás buscar y ver todos los proyectos de las universidades del país",
    {
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
    await this.sleep(5000);
    message = this.createChatBotMessage("Contamos con módulos de estadísticas, recomendaciones personalizadas para nuestros usuarios y búsquedas inteligentes para poder ayudarte a encontrar lo que estás buscando",
    {
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
    await this.sleep(7000);
    message = this.createChatBotMessage("Así que, ¡animate a ser parte de esta comunidad!",
    {
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
    await this.sleep(2000);
    message = this.createChatBotMessage("Te pudo ayudar con algo más?",
    {
      widget: "moreHelpOptions",
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
    
  }
  
  handleProyectabotQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Ay, gracias por preguntar");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Yo soy Proyectabot, el fiel compañero ayuda de Proyectate. Mi funcion es ayudarte a encontrar lo que estés buscando y resolver cualquier duda que puedas tener");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Te pudo ayudar con algo más?",
    {
      widget: "moreHelpOptions",
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
  };
  
  handleBugNotification = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Para notificar algún problema en la página, por favor dirigí un mail a proyeception@gmail.com con el detalle de qué estabas haciendo y una captura del error si es posible");
    this.addMessageToState(message);
    message = this.createChatBotMessage("¡Muchas gracias por ayudarnos a mejorar!");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Te pudo ayudar con algo más?",
    {
      widget: "moreHelpOptions",
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
  };

  handleMoreHelp = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Con qué te puedo ayudar?",
    {
      widget: "generalOptions",
      withAvatar: false,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
  };
  
  handleNoMoreHelp = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("De nada! Chau!")
    this.addMessageToState(message);
  };
  
  handleProjectUploadQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage("Para cargar un proyecto blah");
    this.addMessageToState(message);
  };
  
  addUserMessage = (userMessage : String) => {
    const message = this.createClientMessage(userMessage)
    this.addMessageToState(message)
  }

  addMessageToState = (message: String) => {
    this.setState((state:any) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ActionProvider;
