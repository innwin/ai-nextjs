import {NextApiRequest, NextApiResponse} from "next";
import {getServerSideConfig} from "@/config/server";
import {GoogleGenerativeAI} from "@google/generative-ai";

// https://github.com/vercel/next.js/tree/canary/examples/api-routes

/**
 * @swagger
 * /api/googleai/generatecontent:
 *   post:
 *     description: Returns Generate
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             default: 写一个关于魔法背包的故事
 *     responses:
 *       200:
 *         description: Generate
 *         schema:
 *           type: string
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const {geminiApiKey} = getServerSideConfig();

    // console.log(`密钥 : ${geminiApiKey}`);
    // console.log(`prompt : ${req.body}`);

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    // https://ai.google.dev/models/gemini?hl=zh-cn
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(req.body);
    res.status(200).send(result.response.text());
}