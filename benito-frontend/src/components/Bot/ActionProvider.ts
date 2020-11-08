class ActionProvider {
  createChatBotMessage : any
  setState : any
  createClientMessage : any

  constructor(createChatBotMessage:any, setStateFunc:any, createClientMessage:any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage
  }

  handleDefault = () => {
    const message = this.createChatBotMessage("Perdon, no entendí qué quisiste decir. ¿Arrancamos de nuevo?",      
    {
      widget: "generalOptions",
      delay: 500,
    });
    this.addMessageToState(message);
  }

  handleCategoriesChoice = (userMessage : String) => {
    this.setState((state:any) => ({
      ...state,
      canWrite:true
    }));

    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage(
      "¿Te interesa alguna de estas categorías? Si tenías otra cosa en mente, escribimelo",
      {
        widget: "categoriesOptions",
        withAvatar: true,
        loading: true,
        terminateLoading: true,
      }
    );
    this.addMessageToState(message);
  };

  handleProyectateQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Proyectate es la plataforma central en la que podrás buscar y ver todos los proyectos de las universidades del país");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Contamos con módulos de estadísticas, recomendaciones personalizadas para nuestros usuarios, e indexación en todas nuestras búsquedas para poder ayudarte a encontrar lo que estás buscando");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Así que, ¡animate a ser parte de esta comunidad!");
    this.addMessageToState(message);
  }

  handleProyectabotQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Ay, gracias por preguntar");
    this.addMessageToState(message);
    message = this.createChatBotMessage("Yo soy Proyectabot, el fiel compañero ayuda de Proyectate. Mi funcion es ayudarte a encontrar lo que estés buscando y resolver cualquier duda que puedas tener");
    this.addMessageToState(message);
  };

  handleBugNotification = (userMessage : String) => {
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("Para notificar algún problema en la página, por favor dirigí un mail a proyeception@gmail.com con el detalle de qué estabas haciendo y una captura del error si es posible");
    this.addMessageToState(message);
    message = this.createChatBotMessage("¡Muchas gracias por ayudarnos a mejorar!");
    this.addMessageToState(message);
  };

  handleProjectUploadQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage("¿Cargar un proyecto como autor o supervisor?",
    {
      widget: "uploadOptions",
      withAvatar: true,
      loading: true,
      terminateLoading: true,
    });
    this.addMessageToState(message);
  };

  handleProjectParse = (userMessage : String) => {
    this.setState((state:any) => ({
      ...state,
      canWrite:false
    }));
    this.addUserMessage(userMessage)
    let message = this.createChatBotMessage("TO-DO");
    this.addMessageToState(message);
  };

  handleAuthorUploadQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage("TO-DO");
    this.addMessageToState(message);
  };

  handleSupervisorUploadQuestion = (userMessage : String) => {
    this.addUserMessage(userMessage)
    const message = this.createChatBotMessage('Para cargar un proyecto como supervisor solo hace falta hacer click en "Crear nuevo proyecto" arriba a la derecha, donde está tu nombre. Después, ingresás los datos que te pide el formulario, ¡y listo!');
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
}

export default ActionProvider;
