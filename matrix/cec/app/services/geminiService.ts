
import { GoogleGenAI, Type } from "@google/genai";
import { CNNConfig, LayerType } from '../types';

// Ensure the API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        inputShape: {
            type: Type.OBJECT,
            properties: {
                width: { type: Type.INTEGER, description: "The width of the input images." },
                height: { type: Type.INTEGER, description: "The height of the input images." },
                channels: { type: Type.INTEGER, description: "The number of color channels (e.g., 1 for grayscale, 3 for RGB)." },
            },
            required: ["width", "height", "channels"],
        },
        layers: {
            type: Type.ARRAY,
            description: "An array of layers for the CNN.",
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: `The type of layer. Must be one of: '${LayerType.CONV}', '${LayerType.POOL}', '${LayerType.FLATTEN}', '${LayerType.DENSE}'.`},
                    filters: { type: Type.INTEGER, description: "Number of filters for a convolutional layer." },
                    kernelSize: { type: Type.INTEGER, description: "Kernel size for a convolutional layer." },
                    activation: { type: Type.STRING, description: "Activation function (e.g., 'relu', 'softmax')." },
                    poolSize: { type: Type.INTEGER, description: "Pool size for a pooling layer." },
                    method: { type: Type.STRING, description: "Pooling method ('max' or 'average')." },
                    units: { type: Type.INTEGER, description: "Number of units for a dense layer." },
                },
                required: ["type"],
            },
        },
    },
    required: ["inputShape", "layers"],
};

export async function suggestArchitecture(description: string): Promise<CNNConfig | null> {
  const prompt = `
    You are an expert machine learning engineer specializing in computer vision.
    A user wants to create a Convolutional Neural Network (CNN) for an image classification task.
    Based on their description, design a sensible and effective CNN architecture.

    User's dataset description: "${description}"

    Generate a complete JSON object representing the CNN architecture that conforms to the provided schema.
    - Infer a reasonable input shape (width, height, channels) if not explicitly mentioned. For example, MNIST is 28x28x1, CIFAR-10 is 32x32x3.
    - Always start with a few convolutional and pooling layers.
    - ALWAYS include one 'flatten' layer after the convolutional/pooling blocks and before the dense layers.
    - End with one or more dense layers. The final dense layer should use a 'softmax' activation function, and its 'units' should correspond to a reasonable number of classes (e.g., 10 for digit classification).
    - Provide standard, commonly used values for parameters like filters, kernel size, and units.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);

    // Add unique IDs to each layer, which are required by the frontend state management
    const layersWithIds = parsedJson.layers.map((layer: any, index: number) => ({
      ...layer,
      id: `${layer.type}-${index}-${Date.now()}`,
    }));

    const finalConfig: CNNConfig = {
        inputShape: parsedJson.inputShape,
        layers: layersWithIds,
        learningRate: 0.001, // default
        optimizer: 'Adam' // default
    };

    return finalConfig;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // You might want to handle specific errors differently
    return null;
  }
}
   