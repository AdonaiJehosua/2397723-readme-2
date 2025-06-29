import {File} from '@project/types';
import {Entity} from '@project/core';

export class UploaderEntity implements File, Entity<string> {
  public id?: string;
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public subDirectory: string;

  static fromObject(data: File): UploaderEntity {
    return new UploaderEntity().populate(data);
  }

  public toObject() {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory,
    }
  }

  public populate(data: File): UploaderEntity {
    this.id = data.id ?? undefined;
    this.originalName = data.originalName;
    this.size = data.size;
    this.mimetype = data.mimetype;
    this.hashName = data.hashName;
    this.subDirectory = data.subDirectory;
    this.path = data.path;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;

    return this;
  }
}
