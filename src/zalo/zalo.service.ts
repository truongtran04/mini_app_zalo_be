import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZaloService {
  constructor(private config: ConfigService) {}

  async decodePhoneToken(token: string): Promise<string> {
    const appId = this.config.get<string>('ZALO_APP_ID');
    const secretKey = this.config.get<string>('ZALO_APP_SECRET');

    const res = await fetch('https://graph.zalo.me/v2.0/me/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        access_token: token,
        secret_key: secretKey,
      }),
    });

    const data = await res.json() as {
      error: number;
      message?: string;
      data?: { number?: string };
    };

    if (data.error !== 0 || !data.data?.number) {
      throw new BadRequestException(
        `Zalo API lỗi: ${data.message ?? 'Không giải mã được SĐT'}`,
      );
    }

    return data.data.number;
  }
}
