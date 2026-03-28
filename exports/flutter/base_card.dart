import 'package:flutter/material.dart';

// ── Enums ──────────────────────────────────────────────────────────────────

enum CardSize { lg, sm }

enum CardAction { none, button, twoButtons, link, twoLinks }

// ── BaseCard ───────────────────────────────────────────────────────────────

class BaseCard extends StatelessWidget {
  const BaseCard({
    super.key,
    this.size = CardSize.lg,
    this.filled = false,
    this.category = 'Category',
    this.showCategory = true,
    this.title = 'Title',
    this.showTitle = true,
    this.subtitle = 'Subtitle',
    this.showSubtitle = true,
    this.leftAsset = true,
    this.rightAsset = true,
    this.leftIcon,
    this.rightIcon,
    this.action = CardAction.none,
    this.slot,
    this.showSlot = false,
    this.buttonLabel = 'Button label',
    this.buttonLabel2 = 'Button label',
    this.linkLabel = 'Link label',
    this.linkLabel2 = 'Link label',
    this.onTap,
    this.width = 327,
  });

  final CardSize size;
  final bool filled;
  final String category;
  final bool showCategory;
  final String title;
  final bool showTitle;
  final String subtitle;
  final bool showSubtitle;
  final bool leftAsset;
  final bool rightAsset;
  final Widget? leftIcon;
  final Widget? rightIcon;
  final CardAction action;
  final Widget? slot;
  final bool showSlot;
  final String buttonLabel;
  final String buttonLabel2;
  final String linkLabel;
  final String linkLabel2;
  final VoidCallback? onTap;
  final double width;

  // ── Size values (mirrors sizeMap in TSX) ─────────────────────────────────

  double get _padding => size == CardSize.lg
      ? DSTokens.spacing06   // 24px
      : DSTokens.spacing05;  // 20px

  double get _gap => DSTokens.spacing06; // 24px — both sizes

  double get _assetSize => size == CardSize.lg ? 24.0 : 20.0;

  double get _categoryFontSize => size == CardSize.lg
      ? DSTokens.fontSizeSm  // 14px
      : DSTokens.fontSizeXs; // 12px

  double get _titleFontSize => size == CardSize.lg
      ? DSTokens.fontSizeLg  // 20px
      : DSTokens.fontSizeMd; // 16px

  double get _subtitleFontSize => size == CardSize.lg
      ? DSTokens.fontSizeSm  // 14px
      : DSTokens.fontSizeXs; // 12px

  double get _titleLineHeight => size == CardSize.lg ? 1.16 : 1.24;

  double get _linkGap => size == CardSize.lg ? 24.0 : 20.0;

  double get _dividerHeight => size == CardSize.lg ? 16.0 : 12.0;

  // ── Colors ────────────────────────────────────────────────────────────────

  Color get _backgroundColor => filled
      ? DSTokens.colorSurfaceBg
      : DSTokens.colorSurface;

  Border? get _border => filled
      ? null
      : Border.all(color: DSTokens.colorStroke, width: 1);

  // ── Build ─────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final hasLinks = action == CardAction.link || action == CardAction.twoLinks;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        decoration: BoxDecoration(
          color: _backgroundColor,
          borderRadius: BorderRadius.circular(DSTokens.radiusXl),
          border: _border,
        ),
        padding: hasLinks
            ? EdgeInsets.only(
                top: _padding,
                left: _padding,
                right: _padding,
                bottom: DSTokens.spacing04, // 16px
              )
            : EdgeInsets.all(_padding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Top section: assets + text ──────────────────────────────
            _TopSection(
              size: size,
              assetSize: _assetSize,
              gap: _gap,
              categoryFontSize: _categoryFontSize,
              titleFontSize: _titleFontSize,
              subtitleFontSize: _subtitleFontSize,
              titleLineHeight: _titleLineHeight,
              category: category,
              showCategory: showCategory,
              title: title,
              showTitle: showTitle,
              subtitle: subtitle,
              showSubtitle: showSubtitle,
              leftAsset: leftAsset,
              rightAsset: rightAsset,
              leftIcon: leftIcon,
              rightIcon: rightIcon,
            ),

            // ── Slot ──────────────────────────────────────────────────────
            if (showSlot) ...[
              SizedBox(height: _gap),
              AspectRatio(
                aspectRatio: 1,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(DSTokens.radiusLg),
                  child: slot ??
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFFF7F0FF),
                          borderRadius: BorderRadius.circular(DSTokens.radiusLg),
                          border: Border.all(
                            color: const Color(0xFF8000F0),
                            style: BorderStyle.solid,
                          ),
                        ),
                        child: const Center(
                          child: Text(
                            'CustomSlot',
                            style: TextStyle(
                              color: Color(0xFF8000F0),
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ),
                ),
              ),
            ],

            // ── Actions ───────────────────────────────────────────────────
            if (action == CardAction.button) ...[
              SizedBox(height: _gap),
              SizedBox(
                width: double.infinity,
                child: _DSButton(
                  label: buttonLabel,
                  size: size == CardSize.lg ? _DSButtonSize.md : _DSButtonSize.sm,
                ),
              ),
            ],

            if (action == CardAction.twoButtons) ...[
              SizedBox(height: _gap),
              Row(
                children: [
                  Expanded(
                    child: _DSButton(
                      label: buttonLabel,
                      size: size == CardSize.lg ? _DSButtonSize.md : _DSButtonSize.sm,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _DSButton(
                      label: buttonLabel2,
                      size: size == CardSize.lg ? _DSButtonSize.md : _DSButtonSize.sm,
                    ),
                  ),
                ],
              ),
            ],

            if (action == CardAction.link)
              _LinkButton(label: linkLabel, onTap: onTap),

            if (action == CardAction.twoLinks)
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _LinkButton(label: linkLabel, onTap: onTap),
                  SizedBox(width: _linkGap),
                  Container(
                    width: 1,
                    height: _dividerHeight,
                    color: DSTokens.colorStroke,
                  ),
                  SizedBox(width: _linkGap),
                  _LinkButton(label: linkLabel2, onTap: onTap),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

// ── Top Section ───────────────────────────────────────────────────────────

class _TopSection extends StatelessWidget {
  const _TopSection({
    required this.size,
    required this.assetSize,
    required this.gap,
    required this.categoryFontSize,
    required this.titleFontSize,
    required this.subtitleFontSize,
    required this.titleLineHeight,
    required this.category,
    required this.showCategory,
    required this.title,
    required this.showTitle,
    required this.subtitle,
    required this.showSubtitle,
    required this.leftAsset,
    required this.rightAsset,
    this.leftIcon,
    this.rightIcon,
  });

  final CardSize size;
  final double assetSize;
  final double gap;
  final double categoryFontSize;
  final double titleFontSize;
  final double subtitleFontSize;
  final double titleLineHeight;
  final String category;
  final bool showCategory;
  final String title;
  final bool showTitle;
  final String subtitle;
  final bool showSubtitle;
  final bool leftAsset;
  final bool rightAsset;
  final Widget? leftIcon;
  final Widget? rightIcon;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(
          padding: EdgeInsets.only(bottom: DSTokens.spacing04),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Left asset
              if (leftAsset) ...[
                SizedBox(
                  width: assetSize,
                  height: assetSize,
                  child: leftIcon ??
                      Container(
                        decoration: BoxDecoration(
                          color: DSTokens.colorSurfaceSubtle,
                          borderRadius: BorderRadius.circular(DSTokens.radiusSm),
                        ),
                      ),
                ),
                SizedBox(height: DSTokens.spacing03),
              ],

              // Text group
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (showCategory)
                    Text(
                      category,
                      style: TextStyle(
                        fontSize: categoryFontSize,
                        color: DSTokens.colorBrand,
                        fontWeight: FontWeight.w400,
                        height: 1.24,
                        fontFamily: DSTokens.fontFamilyBase,
                      ),
                    ),
                  if (showCategory && showTitle) const SizedBox(height: 4),
                  if (showTitle)
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: titleFontSize,
                        color: DSTokens.colorContentPrimary,
                        fontWeight: FontWeight.w500,
                        height: titleLineHeight,
                        fontFamily: DSTokens.fontFamilyBase,
                      ),
                    ),
                  if (showSubtitle) const SizedBox(height: 4),
                  if (showSubtitle)
                    Text(
                      subtitle,
                      style: TextStyle(
                        fontSize: subtitleFontSize,
                        color: DSTokens.colorContentSecondary,
                        fontWeight: FontWeight.w400,
                        height: 1.24,
                        fontFamily: DSTokens.fontFamilyBase,
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),

        // Right asset — top right
        if (rightAsset)
          Positioned(
            top: 0,
            right: 0,
            child: SizedBox(
              width: assetSize,
              height: assetSize,
              child: rightIcon ??
                  Container(
                    decoration: BoxDecoration(
                      color: DSTokens.colorSurfaceSubtle,
                      borderRadius: BorderRadius.circular(DSTokens.radiusSm),
                    ),
                  ),
            ),
          ),
      ],
    );
  }
}

// ── Internal Button (mirrors DS Button) ───────────────────────────────────

enum _DSButtonSize { sm, md, lg }

class _DSButton extends StatelessWidget {
  const _DSButton({required this.label, this.size = _DSButtonSize.md, this.onTap});

  final String label;
  final _DSButtonSize size;
  final VoidCallback? onTap;

  double get _height => switch (size) {
        _DSButtonSize.sm => 36.0,
        _DSButtonSize.md => 44.0,
        _DSButtonSize.lg => 52.0,
      };

  double get _fontSize => switch (size) {
        _DSButtonSize.sm => DSTokens.fontSizeXs,
        _DSButtonSize.md => DSTokens.fontSizeSm,
        _DSButtonSize.lg => DSTokens.fontSizeMd,
      };

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: _height,
        decoration: BoxDecoration(
          color: DSTokens.colorBrand,
          borderRadius: BorderRadius.circular(DSTokens.radiusPill),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            fontSize: _fontSize,
            fontWeight: FontWeight.w500,
            color: DSTokens.colorGrayWhite,
            fontFamily: DSTokens.fontFamilyBase,
            letterSpacing: 0.1,
          ),
        ),
      ),
    );
  }
}

// ── Internal Link Button ──────────────────────────────────────────────────

class _LinkButton extends StatelessWidget {
  const _LinkButton({required this.label, this.onTap});

  final String label;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Text(
          label,
          style: TextStyle(
            fontSize: DSTokens.fontSizeSm,
            color: DSTokens.colorBrand,
            fontWeight: FontWeight.w500,
            fontFamily: DSTokens.fontFamilyBase,
            letterSpacing: 0.1,
          ),
        ),
      ),
    );
  }
}

// ── DSTokens reference ────────────────────────────────────────────────────
// Replace with your actual token class/theme extension

abstract class DSTokens {
  // Colors
  static const colorBrand            = Color(0xFFBE0380);
  static const colorContentPrimary   = Color(0xFF141414);
  static const colorContentSecondary = Color(0xFF6B6B6B);
  static const colorSurface          = Color(0xFFFFFFFF);
  static const colorSurfaceBg        = Color(0xFFF5F5F5);
  static const colorSurfaceSubtle    = Color(0xFFEBEBEB);
  static const colorStroke           = Color(0x1A141414); // rgba(20,20,20,0.1)
  static const colorGrayWhite        = Color(0xFFFFFFFF);

  // Spacing
  static const spacing01 = 4.0;
  static const spacing02 = 8.0;
  static const spacing03 = 12.0;
  static const spacing04 = 16.0;
  static const spacing05 = 20.0;
  static const spacing06 = 24.0;

  // Font sizes
  static const fontSizeXs = 12.0;
  static const fontSizeSm = 14.0;
  static const fontSizeMd = 16.0;
  static const fontSizeLg = 20.0;
  static const fontSizeXl = 24.0;

  // Radius
  static const radiusXs   = 8.0;
  static const radiusSm   = 12.0;
  static const radiusMd   = 16.0;
  static const radiusLg   = 20.0;
  static const radiusXl   = 24.0;
  static const radiusPill = 200.0;

  // Font families
  static const fontFamilyBase  = 'Haffer';
  static const fontFamilyLabel = 'DM Sans';
}
