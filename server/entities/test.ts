// import { EventSubscriber, EntitySubscriberInterface } from "typeorm";
// import MessageEntity from './message';

// @EventSubscriber()
// export class MessageSubscriber implements EntitySubscriberInterface<MessageEntity> {
//   listenTo() {
//     return MessageEntity;
//   }

//   async afterLoad(message: MessageEntity): Promise<void> {
//     message.fullName = '2222' + " " + '3333';
//   }
// }