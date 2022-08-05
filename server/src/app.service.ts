import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js';
import { readFile } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getXMLData() {
    const parser = new xml2js.Parser();

    readFile(join(__dirname, 'data/data.xml'), function (err, data) {
      parser.parseString(data, function (err_inner, result) {
        console.log(join(__dirname, 'data/data.xml'));
        console.dir(data);
        console.log('Done');
        return JSON.stringify(result);
      });
    });
  }
}
