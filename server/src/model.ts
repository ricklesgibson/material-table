import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Widget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    price: number;

    @Column()
    date: Date;
}

let connection:Connection;

export async function getWidgetRepository(): Promise<Repository<Widget>> {
    if (connection===undefined) {
        connection = await createConnection({
            type: 'sqlite',
            database: 'widgetapp.db',
            synchronize: true,
            entities: [
                Widget
            ],
        });
    }
    return connection.getRepository(Widget);
}
