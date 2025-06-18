
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sun, Shield, AlertTriangle } from "lucide-react";

interface UVAlertProps {
  uvIndex: number;
}

const UVAlert = ({ uvIndex }: UVAlertProps) => {
  const getUVInfo = (uv: number) => {
    if (uv <= 2) {
      return {
        level: "Bajo",
        color: "bg-green-500",
        textColor: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: Sun,
        description: "Puede permanecer al aire libre sin protección.",
        recommendation: "No se requiere protección especial."
      };
    } else if (uv <= 5) {
      return {
        level: "Moderado",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: Sun,
        description: "Busque sombra durante las horas del mediodía.",
        recommendation: "Use protector solar SPF 30+, sombrero y gafas de sol."
      };
    } else if (uv <= 7) {
      return {
        level: "Alto",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: Shield,
        description: "La protección solar es esencial.",
        recommendation: "Evite el sol entre 10am-4pm. Use SPF 30+, ropa protectora."
      };
    } else if (uv <= 10) {
      return {
        level: "Muy Alto",
        color: "bg-red-500",
        textColor: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertTriangle,
        description: "Tome precauciones adicionales.",
        recommendation: "Evite el sol entre 10am-4pm. Use SPF 50+, ropa de manga larga."
      };
    } else {
      return {
        level: "Extremo",
        color: "bg-purple-500",
        textColor: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        icon: AlertTriangle,
        description: "Evite la exposición al sol.",
        recommendation: "Permanezca en interiores o busque sombra completa. SPF 50+ obligatorio."
      };
    }
  };

  const uvInfo = getUVInfo(uvIndex);
  const IconComponent = uvInfo.icon;

  return (
    <Card className={`border-2 ${uvInfo.borderColor} ${uvInfo.bgColor}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent size={20} className={uvInfo.textColor} />
            <span className={uvInfo.textColor}>Índice UV</span>
          </div>
          <Badge className={`text-white ${uvInfo.color}`}>
            {uvIndex} • {uvInfo.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* UV Index Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>11+</span>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            {/* UV Scale Background */}
            <div className="absolute inset-0 flex">
              <div className="bg-green-500 flex-1"></div>
              <div className="bg-yellow-500 flex-1"></div>
              <div className="bg-orange-500 flex-1"></div>
              <div className="bg-red-500 flex-1"></div>
              <div className="bg-purple-500 flex-1"></div>
            </div>
            {/* Current UV Position */}
            <div 
              className="absolute top-0 w-1 h-full bg-white border border-gray-800"
              style={{ left: `${Math.min((uvIndex / 11) * 100, 95)}%` }}
            ></div>
          </div>
        </div>

        {/* Alert Message */}
        <Alert className={`border ${uvInfo.borderColor}`}>
          <AlertDescription className={uvInfo.textColor}>
            <div className="space-y-1">
              <p className="font-medium">{uvInfo.description}</p>
              <p className="text-sm">{uvInfo.recommendation}</p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-800">{uvIndex}</div>
            <div className="text-xs text-gray-600">Índice Actual</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-800">
              {uvIndex > 7 ? '10am-4pm' : '12pm-2pm'}
            </div>
            <div className="text-xs text-gray-600">Horas de Riesgo</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-800">
              SPF {uvIndex > 7 ? '50+' : uvIndex > 2 ? '30+' : '15+'}
            </div>
            <div className="text-xs text-gray-600">Recomendado</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UVAlert;
