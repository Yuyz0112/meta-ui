import { Type } from '@sinclair/typebox';

export const ColorSchemePropertySchema = Type.Optional(
  Type.KeyOf(
    Type.Object({
      whiteAlpha: Type.String(),
      blackAlpha: Type.String(),
      gray: Type.String(),
      red: Type.String(),
      orange: Type.String(),
      yellow: Type.String(),
      green: Type.String(),
      teal: Type.String(),
      blue: Type.String(),
      cyan: Type.String(),
      purple: Type.String(),
      pink: Type.String(),
      linkedin: Type.String(),
      facebook: Type.String(),
      messenger: Type.String(),
      whatsapp: Type.String(),
      twitter: Type.String(),
      telegram: Type.String(),
    })
  )
);
