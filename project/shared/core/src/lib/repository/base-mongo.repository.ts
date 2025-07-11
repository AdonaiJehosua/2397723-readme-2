import {Document, Model} from 'mongoose';
import {NotFoundException} from '@nestjs/common';
import {Entity, EntityIdType, Repository} from '@project/core';


export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document
> implements Repository<EntityType> {

  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {
  }

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({versionKey: false}));
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();
    // @ts-ignore
    return this.createEntityFromDocument(document);
  }

  public async findManyById(ids: EntityType['id'][]): Promise<EntityType[] | []> {
    const documents = await this.model.find({
      _id: {
        $in: ids,
      }
    })
    // @ts-ignore
    return documents.map(item => this.createEntityFromDocument(item));
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toObject());
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
  }

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      id,
      entity.toObject(),
      {new: true, runValidators: true}
    )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }
}
