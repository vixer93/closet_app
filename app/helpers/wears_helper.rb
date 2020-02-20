module WearsHelper

  def to_hex(n)
    num_hex = n.to_s 16
    num_hex = num_hex.insert(0, "0") if num_hex.length == 1
    return num_hex
  end

  def rgb_to_hex(r, g, b)
    r_hex = to_hex r
    g_hex = to_hex g
    b_hex = to_hex b
    "\##{r_hex}#{g_hex}#{b_hex}"
  end

  def wear_brightness(red, green, blue)
    revision_rate = {r: 0.9, g: 0.8, b: 0.4}

    r_after_rev = red   * revision_rate[:r]
    g_after_rev = green * revision_rate[:g]
    b_after_rev = blue  * revision_rate[:b]

    bright = ([r_after_rev, g_after_rev, b_after_rev].max / 255).round(2)
  end

  def wear_chroma(red, green, blue)
    max_val = [red, green, blue].max
    min_val = [red, green, blue].min
    chroma = ((max_val - min_val) / max_val.to_f).round(2)
  end

  def wear_hue(red, green, blue)
    max_color_val = [red, green, blue].uniq.count == 1 ? 0 : [red, green, blue].max
    min_color_val = [red, green, blue].min

    case max_color_val
    when red
      hue = (60 * ((green - blue) / (red - min_color_val).to_f)).round(2)
    when green
      hue = (60 * ((blue - red) / (green - min_color_val).to_f) + 120).round(2)
    when blue
      hue = (60 * ((red - green) / (blue - min_color_val).to_f) + 240).round(2)
    end

    hue += 360 if hue < 0
    hue
  end

end
