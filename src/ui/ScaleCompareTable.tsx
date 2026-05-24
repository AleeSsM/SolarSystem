import { formatDistanceKm, getPlanetScaleRows } from '../data/scaleCompare'

export function ScaleCompareTable() {
  const rows = getPlanetScaleRows()

  return (
    <div className="scale-compare scale-compare--embedded">
      <p className="scale-compare__intro">
        Las órbitas en pantalla están comprimidas. Los periodos orbitales sí son reales.
      </p>
      <div className="scale-compare__table-wrap">
        <table className="scale-compare__table">
          <thead>
            <tr>
              <th>Planeta</th>
              <th>Real</th>
              <th>Escena</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  {row.au.toFixed(2)} UA · {formatDistanceKm(row.realDistanceKm)}
                </td>
                <td>{row.sceneOrbitUnits.toFixed(1)} u</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
