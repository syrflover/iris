// tslint:disable: max-classes-per-file

export class Channel {
    public async send(str: string) {}
}

export class Message {
    public channel = new Channel();

    public async react() {}
}
