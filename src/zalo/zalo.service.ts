import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZaloService {
  constructor(private config: ConfigService) {}

  async decodePhoneToken(
    phoneToken: string,
    accessToken: string,
  ): Promise<string> {
    const secretKey = this.config.get<string>('ZALO_APP_SECRET') ?? '';

    const res = await fetch(
      `https://graph.zalo.me/v2.0/me/info?fields=id,name,picture,phone`,
      {
        method: 'GET',
        headers: new Headers({
          access_token: accessToken,
          code: phoneToken,
          secret_key: secretKey,
        }),
      },
    );

    const data = (await res.json()) as {
      error: number;
      message?: string;
      phone?: string; // ← ở endpoint này phone nằm trực tiếp
      name?: string;
      id?: string;
    };

    if (data.error !== 0 || !data.phone) {
      throw new BadRequestException(
        `Zalo API lỗi: ${data.message ?? 'Không giải mã được SĐT'}`,
      );
    }

    return data.phone;
  }
}
