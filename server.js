import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import _ from 'lodash';
import http from 'http';
import { fileURLToPath } from "url";
import fs from 'fs';
import axios from 'axios';

console.warn = () => {};

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

const app = express();

const port = 3000;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})

const server = http.Server(app);
app.use(express.static(`${__dirname}/public`));

// 파일 업로드 허용
app.use(fileUpload({
    createParentPath: true
}));

// 미들 웨어 추가
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post('/resource', async (req, res) => {
    try {
        console.log(req.body);
        switch(req.body.type) {
            case "hello":
                res.send({
                    status: 'ok',
                    message: 'Hello 메시지가 도착하였습니다.',
                    data: {
                        source: '안녕하세요, 반갑습니다!!!'
                    }
                });
                break;
            case "sourceUrl":
                if (!req.body.sourceUrl || req.body.sourceUrl === "") {
                    res.send({ status: "error", message: "URL주소를 보내주세요..." });
                } else {
                    const response = await axios.get(req.body.sourceUrl);
                    res.send({
                    status: "ok",
                    message: "소스코드 요청 메시지가 도착하였습니다.",
                    data: {
                        url: req.body.sourceUrl,
                        source: response.data
                    }
                    });
                }
                break;

            case "ecampus":
            case "url":
                if (req.body.type=="url" && (!req.body.url || req.body.url=="")) {
                    res.send({
                        status: 'error',
                        message: 'URL주소를 보내주세요...'
                    });
                } else {
                    let url = (req.body.type=='ecampus') ? "https://ecampus.kookmin.ac.kr/login/index.php": req.body.url;
                    const response = await axios.get(url);
                    const result = response.data;
                    console.log(result);
                    res.send({
                        status: 'ok',
                        message: '소스코드 요청 메시지가 도착하였습니다.',
                        data: {
                            url: url,
                            source: result
                        }
                    });
                }
                break;
            default:
                res.send({
                    status: 'error',
                    message: `type속성 값(${req.body.type})이 올바르지 않습니다.`
                });
            break;
        }
    } catch (err) {
        res.status(500).send(err);
    }
})
