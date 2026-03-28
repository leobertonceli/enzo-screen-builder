import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'base_card.dart';

// ── Widgetbook Use Cases ───────────────────────────────────────────────────
//
// Drop this file into your Widgetbook setup and add BaseCardUseCases
// to your WidgetbookComponent list.
//
// Example:
//   WidgetbookComponent(
//     name: 'BaseCard',
//     useCases: BaseCardUseCases.all,
//   ),

abstract class BaseCardUseCases {
  static final all = [
    _outlined,
    _filled,
    _withSlot,
    _interactive,
  ];

  // ── Outlined (default) ──────────────────────────────────────────────────
  static final _outlined = WidgetbookUseCase(
    name: 'Outlined',
    builder: (context) => Center(
      child: BaseCard(
        size: context.knobs.list(
          label: 'Size',
          options: CardSize.values,
          initialOption: CardSize.lg,
          labelBuilder: (v) => v.name,
        ),
        filled: false,
        showCategory: context.knobs.boolean(label: 'Show category', initialValue: true),
        category: context.knobs.string(label: 'Category', initialValue: 'Novidade'),
        showTitle: context.knobs.boolean(label: 'Show title', initialValue: true),
        title: context.knobs.string(label: 'Title', initialValue: 'Frete grátis hoje'),
        showSubtitle: context.knobs.boolean(label: 'Show subtitle', initialValue: true),
        subtitle: context.knobs.string(label: 'Subtitle', initialValue: 'Pedidos acima de R\$50'),
        leftAsset: context.knobs.boolean(label: 'Left asset', initialValue: true),
        rightAsset: context.knobs.boolean(label: 'Right asset', initialValue: false),
        action: context.knobs.list(
          label: 'Action',
          options: CardAction.values,
          initialOption: CardAction.button,
          labelBuilder: (v) => v.name,
        ),
        buttonLabel: context.knobs.string(label: 'Button label', initialValue: 'Ver ofertas'),
        buttonLabel2: context.knobs.string(label: 'Button 2 label', initialValue: 'Comparar'),
        linkLabel: context.knobs.string(label: 'Link label', initialValue: 'Saiba mais'),
        linkLabel2: context.knobs.string(label: 'Link 2 label', initialValue: 'Fale conosco'),
      ),
    ),
  );

  // ── Filled ──────────────────────────────────────────────────────────────
  static final _filled = WidgetbookUseCase(
    name: 'Filled',
    builder: (context) => Center(
      child: BaseCard(
        size: context.knobs.list(
          label: 'Size',
          options: CardSize.values,
          initialOption: CardSize.sm,
          labelBuilder: (v) => v.name,
        ),
        filled: true,
        showCategory: context.knobs.boolean(label: 'Show category', initialValue: true),
        category: context.knobs.string(label: 'Category', initialValue: 'Dica'),
        showTitle: context.knobs.boolean(label: 'Show title', initialValue: true),
        title: context.knobs.string(label: 'Title', initialValue: 'Beba mais água'),
        showSubtitle: context.knobs.boolean(label: 'Show subtitle', initialValue: true),
        subtitle: context.knobs.string(label: 'Subtitle', initialValue: 'Você bebeu apenas 3 copos hoje'),
        leftAsset: context.knobs.boolean(label: 'Left asset', initialValue: true),
        rightAsset: context.knobs.boolean(label: 'Right asset', initialValue: false),
        action: context.knobs.list(
          label: 'Action',
          options: CardAction.values,
          initialOption: CardAction.none,
          labelBuilder: (v) => v.name,
        ),
        buttonLabel: context.knobs.string(label: 'Button label', initialValue: 'Button label'),
        linkLabel: context.knobs.string(label: 'Link label', initialValue: 'Link label'),
      ),
    ),
  );

  // ── With Slot ────────────────────────────────────────────────────────────
  static final _withSlot = WidgetbookUseCase(
    name: 'With Slot',
    builder: (context) => Center(
      child: BaseCard(
        size: CardSize.lg,
        filled: false,
        category: 'Destaque',
        showCategory: true,
        title: 'Conheça nossos planos',
        showTitle: true,
        subtitle: 'Planos a partir de R\$99/mês',
        showSubtitle: true,
        leftAsset: true,
        rightAsset: false,
        action: CardAction.button,
        buttonLabel: 'Ver planos',
        showSlot: true,
        // Pass your own slot widget here:
        // slot: Image.asset('assets/images/plans.png', fit: BoxFit.cover),
      ),
    ),
  );

  // ── Interactive (all knobs) ───────────────────────────────────────────────
  static final _interactive = WidgetbookUseCase(
    name: 'Interactive',
    builder: (context) => Center(
      child: BaseCard(
        size: context.knobs.list(
          label: 'Size',
          options: CardSize.values,
          initialOption: CardSize.lg,
          labelBuilder: (v) => v.name,
        ),
        filled: context.knobs.boolean(label: 'Filled', initialValue: false),
        category: context.knobs.string(label: 'Category', initialValue: 'Category'),
        showCategory: context.knobs.boolean(label: 'Show category', initialValue: true),
        title: context.knobs.string(label: 'Title', initialValue: 'Title'),
        showTitle: context.knobs.boolean(label: 'Show title', initialValue: true),
        subtitle: context.knobs.string(label: 'Subtitle', initialValue: 'Subtitle'),
        showSubtitle: context.knobs.boolean(label: 'Show subtitle', initialValue: true),
        leftAsset: context.knobs.boolean(label: 'Left asset', initialValue: true),
        rightAsset: context.knobs.boolean(label: 'Right asset', initialValue: true),
        action: context.knobs.list(
          label: 'Action',
          options: CardAction.values,
          initialOption: CardAction.none,
          labelBuilder: (v) => v.name,
        ),
        buttonLabel: context.knobs.string(label: 'Button label', initialValue: 'Button label'),
        buttonLabel2: context.knobs.string(label: 'Button 2 label', initialValue: 'Button label'),
        linkLabel: context.knobs.string(label: 'Link label', initialValue: 'Link label'),
        linkLabel2: context.knobs.string(label: 'Link 2 label', initialValue: 'Link label'),
        showSlot: context.knobs.boolean(label: 'Show slot', initialValue: false),
        onTap: () {},
      ),
    ),
  );
}
