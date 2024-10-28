declare const _default: (() => {
    environment: string;
    apiVersion: string;
    awsBucketName: string;
    awsRegion: string;
    awsCloudfrontUrl: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    mailHost: string;
    smtpUsername: string;
    smtpPassword: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    environment: string;
    apiVersion: string;
    awsBucketName: string;
    awsRegion: string;
    awsCloudfrontUrl: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    mailHost: string;
    smtpUsername: string;
    smtpPassword: string;
}>;
export default _default;
