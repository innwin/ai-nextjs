import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// https://github.com/jellydn/next-swagger-doc

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const spec: Record<string, any> = createSwaggerSpec({
        apiFolder: 'src/pages/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Next Swagger API Example',
                version: '1.0',
            },
        },
    });

    return {
        props: {
            spec,
        },
    };
};

export default ApiDoc;